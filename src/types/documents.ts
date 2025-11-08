export type DocumentSecurityLevel = 'Confidential' | 'Internal' | 'Restricted' | 'Public';

export type DocumentStatus =
  | 'Draft'
  | 'In Review'
  | 'Pending Approval'
  | 'Approved'
  | 'Effective'
  | 'Obsolete';

export type WorkflowStage = 'Drafting' | 'Review' | 'Quality Assurance' | 'Approval' | 'Release';

export interface ElectronicSignature {
  id: string;
  signedBy: string;
  signerRole: string;
  signedAt: string;
  meaning: 'Review' | 'Approval' | 'Execution';
  justification: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  description: string;
  metadata?: Record<string, string>;
}

export interface DocumentVersion {
  id: string;
  version: string;
  createdAt: string;
  changeSummary: string;
  signedOffBy: ElectronicSignature[];
}

export interface DocumentLifecycleEntry {
  id: string;
  stage: WorkflowStage;
  status: DocumentStatus;
  updatedAt: string;
  actor: string;
  role: string;
  signatureId?: string;
}

export interface DocumentType {
  id: string;
  type: string;
  description: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  documentNumber: string;
  documentVersion: string;
  dateCreated: string;
  createdBy: string;
  dateOfIssue: string;
  issuedBy: string;
  issuerRole: string;
  effectiveFrom: string;
  nextReviewDate: string;
  documentType: DocumentType['type'];
  documentCategory: string;
  documentSecurity: DocumentSecurityLevel;
  status: DocumentStatus;
  lifecycle: DocumentLifecycleEntry[];
  versions: DocumentVersion[];
  auditTrail: AuditEvent[];
  workflowConfig: WorkflowTemplate;
}

export interface WorkflowTask {
  id: string;
  stage: WorkflowStage;
  assignedTo: string;
  role: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
  signatureId?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  isDefault: boolean;
  steps: Array<{
    stage: WorkflowStage;
    role: string;
    minimumSignatures: number;
    slaDays: number;
  }>;
}

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
}

export interface UserCredential extends UserProfile {
  pin: string;
}
