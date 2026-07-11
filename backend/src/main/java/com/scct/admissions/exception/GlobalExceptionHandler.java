package com.scct.admissions.exception;

import com.scct.admissions.entity.FormStatus;
import com.scct.admissions.entity.FormSubmissionEvent;
import com.scct.admissions.entity.FormType;
import com.scct.admissions.repository.FormSubmissionEventRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @Autowired
    private FormSubmissionEventRepository formSubmissionEventRepository;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        List<FieldErrorDto> errors = new ArrayList<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(new FieldErrorDto(error.getField(), error.getDefaultMessage()));
        }

        String errorDetail = errors.stream()
                .map(err -> err.getField() + ": " + err.getMessage())
                .collect(Collectors.joining("; "));

        log.warn("Validation failure on request {}: {}", request.getRequestURI(), errorDetail);

        // Only log to form_submission_events if it is the public lead capture endpoint
        if (request.getRequestURI().contains("/api/leads")) {
            try {
                FormSubmissionEvent event = FormSubmissionEvent.builder()
                        .formType(FormType.ENQUIRY)
                        .status(FormStatus.VALIDATION_FAILURE)
                        .errorDetail(errorDetail)
                        .submittedAt(OffsetDateTime.now())
                        .build();
                formSubmissionEventRepository.save(event);
            } catch (Exception dbEx) {
                log.error("Failed to save VALIDATION_FAILURE form submission event to database", dbEx);
            }
        }

        ErrorResponse errorResponse = ErrorResponse.builder()
                .message("Validation failed")
                .errors(errors)
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            ValidationException ex, HttpServletRequest request) {

        List<FieldErrorDto> errors = List.of(new FieldErrorDto(ex.getField(), ex.getMessage()));
        String errorDetail = ex.getField() + ": " + ex.getMessage();

        log.warn("Validation failure on request {}: {}", request.getRequestURI(), errorDetail);

        if (request.getRequestURI().contains("/api/leads")) {
            try {
                FormSubmissionEvent event = FormSubmissionEvent.builder()
                        .formType(FormType.ENQUIRY)
                        .status(FormStatus.VALIDATION_FAILURE)
                        .errorDetail(errorDetail)
                        .submittedAt(OffsetDateTime.now())
                        .build();
                formSubmissionEventRepository.save(event);
            } catch (Exception dbEx) {
                log.error("Failed to save VALIDATION_FAILURE form submission event to database", dbEx);
            }
        }

        ErrorResponse errorResponse = ErrorResponse.builder()
                .message("Validation failed")
                .errors(errors)
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidStateTransitionException.class)
    public ResponseEntity<ErrorResponse> handleInvalidStateTransitionException(InvalidStateTransitionException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message("Invalid username or password")
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAllExceptions(Exception ex, HttpServletRequest request) {
        log.error("Unhandled exception occurred on request {}", request.getRequestURI(), ex);

        // Only log to form_submission_events if it is the public lead capture endpoint
        if (request.getRequestURI().contains("/api/leads")) {
            try {
                FormSubmissionEvent event = FormSubmissionEvent.builder()
                        .formType(FormType.ENQUIRY)
                        .status(FormStatus.SERVER_ERROR)
                        .errorDetail(ex.getClass().getName() + ": " + ex.getMessage())
                        .submittedAt(OffsetDateTime.now())
                        .build();
                formSubmissionEventRepository.save(event);
            } catch (Exception dbEx) {
                log.error("Failed to save SERVER_ERROR form submission event to database", dbEx);
            }
        }

        ErrorResponse errorResponse = ErrorResponse.builder()
                .message("An unexpected server error occurred.")
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
