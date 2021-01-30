import { ErrorRequestHandler } from 'express';
import { Entity } from 'typeorm';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });

        return response.status(400).json({ message: 'Validation fails', errors})

    } else if ( error.name == "EntityNotFound" ) {
        return response.status(404).json({ message: error.message });
    }
    // Tratar todos os possíveis erros gerados ao acessar a API
    
    // Log dos erros.
    console.error(error);

    return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;