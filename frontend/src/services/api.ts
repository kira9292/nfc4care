const API_BASE_URL = 'http://localhost:8080/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.ok) {
      const data = await response.json();
      return { data, success: true };
    } else {
      const errorText = await response.text();
      return { error: errorText, success: false };
    }
  }

  // Authentification
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return this.handleResponse(response);
    } catch (error) {
      return { error: 'Erreur de connexion au serveur', success: false };
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      return { error: 'Erreur lors de la déconnexion', success: false };
    }
  }

  // Patients
  async getPatients(): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/patients`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      return { error: 'Erreur lors de la récupération des patients', success: false };
    }
  }

  async getPatientById(id: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      return { error: 'Erreur lors de la récupération du patient', success: false };
    }
  }

  async getPatientByNFC(nfcId: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/nfc/${nfcId}`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      return { error: 'Erreur lors de la récupération du patient par NFC', success: false };
    }
  }

  async searchPatients(query: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/search?q=${encodeURIComponent(query)}`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      return { error: 'Erreur lors de la recherche de patients', success: false };
    }
  }

  async createPatient(patientData: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/patients`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(patientData),
      });
      return this.handleResponse(response);
    } catch (error) {
      return { error: 'Erreur lors de la création du patient', success: false };
    }
  }

  async updatePatient(id: string, patientData: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(patientData),
      });
      return this.handleResponse(response);
    } catch (error) {
      return { error: 'Erreur lors de la mise à jour du patient', success: false };
    }
  }

  // Blockchain
  async verifyIntegrity(id: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/blockchain/verify/${id}`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      return { error: 'Erreur lors de la vérification blockchain', success: false };
    }
  }
}

export const apiService = new ApiService(); 