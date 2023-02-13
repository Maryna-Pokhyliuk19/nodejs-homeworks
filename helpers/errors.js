class NodjsError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends NodjsError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends NodjsError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends NodjsError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class Conflict extends NodjsError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  NodjsError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  Conflict,
};
