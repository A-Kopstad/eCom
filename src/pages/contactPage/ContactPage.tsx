import  { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";

// Define formValues
interface FormValues {
  fullName: string;
  subject: string;
  email: string;
  body: string;
}

// Define with Yup
const contactSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters long"),
  subject: Yup.string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters long"),
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  body: Yup.string()
    .required("Message body is required")
    .min(3, "Message body must be at least 3 characters long"),
});

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
    reset();
    setIsSubmitted(true);
  };

  return (
    <div className="container my-5">
      <h1>Contact Us</h1>
      {isSubmitted && (
        <Alert variant="success" role="alert">
          Your message has been sent!
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Full Name Field */}
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            {...register("fullName")}
          />
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName.message}</div>
          )}
        </div>

        {/* Subject Field */}
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            className={`form-control ${errors.subject ? "is-invalid" : ""}`}
            {...register("subject")}
          />
          {errors.subject && (
            <div className="invalid-feedback">{errors.subject.message}</div>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        {/* Body Field */}
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Body *
          </label>
          <textarea
            id="body"
            className={`form-control ${errors.body ? "is-invalid" : ""}`}
            rows={5}
            {...register("body")}
          />
          {errors.body && (
            <div className="invalid-feedback">{errors.body.message}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
