// Google Apps Script API Service
// Using Next.js API route to avoid CORS issues
const API_URL = "/api/google-sheet";

export interface StudentFormData {
  purpose: string;
  source: string;
  interest: string;
  timeline: string;
  name: string;
  email: string;
  mobile: string;
  status: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoogleSheetResponse {
  message?: string;
  error?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  message?: string;
  privacyPolicy: boolean;
  course?: string;
}

/**
 * Create a new student record in Google Sheet
 */
export const createStudentRecord = async (
  data: StudentFormData
): Promise<GoogleSheetResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "create",
        ...data,
      }),
    });

    if (!response.ok) {
      // Try to get error details from response
      try {
        const errorData = await response.json();
        if (errorData.error || errorData.message) {
          throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
        }
      } catch {
        // If response is not JSON, throw generic error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const result = await response.json();
    
    // Check if the result itself contains an error
    if (result.error) {
      throw new Error(result.error);
    }
    
    return result;
  } catch (error) {
    console.error("Error creating student record:", error);
    throw error;
  }
};

/**
 * Update an existing student record in Google Sheet
 */
export const updateStudentRecord = async (
  data: StudentFormData
): Promise<GoogleSheetResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "update",
        ...data,
      }),
    });

    if (!response.ok) {
      // Try to get error details from response
      try {
        const errorData = await response.json();
        if (errorData.error || errorData.message) {
          throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
        }
      } catch {
        // If response is not JSON, throw generic error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const result = await response.json();
    
    // Check if the result itself contains an error
    if (result.error) {
      throw new Error(result.error);
    }
    
    return result;
  } catch (error) {
    console.error("Error updating student record:", error);
    throw error;
  }
};

/**
 * Read all student records from Google Sheet
 */
export const readStudentRecords = async (): Promise<StudentFormData[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "read",
      }),
    });

    if (!response.ok) {
      // Try to get error details from response
      try {
        const errorData = await response.json();
        if (errorData.error || errorData.message) {
          throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
        }
      } catch {
        // If response is not JSON, throw generic error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const result = await response.json();
    
    // Check if the result itself contains an error
    if (result.error) {
      throw new Error(result.error);
    }
    
    return result;
  } catch (error) {
    console.error("Error reading student records:", error);
    throw error;
  }
};

/**
 * Submit contact form data to Google Sheet
 * @param data - Contact form data (includes course field for college students)
 */
export const submitContactForm = async (
  data: ContactFormData
): Promise<GoogleSheetResponse> => {
  try {
    // Always use "contact" action - Google Apps Script handles both regular contact and college student forms
    const response = await fetch("/api/contact-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "contact",
        ...data,
      }),
    });

    if (!response.ok) {
      // Try to get error details from response
      try {
        const errorData = await response.json();
        if (errorData.error || errorData.message) {
          throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
        }
      } catch {
        // If response is not JSON, throw generic error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const result = await response.json();
    
    // Check if the result itself contains an error
    if (result.error) {
      throw new Error(result.error);
    }
    
    return result;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

