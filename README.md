# Strimz Payroll Integration Suite

![Strimz Logo](https://example.com/strimz-logo.png)

Secure DeFi payroll management with automated crypto disbursements and enterprise-grade session management.

## Features

- 🔐 AES-256-CBC Session Encryption
- ⏳ Configurable Session Timeouts
- 🛡️ Cross-Tab Session Synchronization
- 📊 Activity-Based Session Renewal
- 🔄 Seamless Crypto Payment Automation

## Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant GuestLayout
    participant AuthLayout
    participant DashboardLayout
    participant SessionStorage

    User->>GuestLayout: Access Public Page
    GuestLayout->>SessionStorage: Check Session
    Note right of GuestLayout: No redirect if authenticated
    
    User->>AuthLayout: Navigate to Login/Signup
    AuthLayout->>SessionStorage: Check Session
    alt Authenticated
        AuthLayout->>DashboardLayout: Redirect
    else New User
        AuthLayout->>User: Show Auth Forms
        User->>AuthLayout: Submit Credentials
        AuthLayout->>SessionStorage: Set Encrypted Session
        AuthLayout->>DashboardLayout: Redirect
    end

    User->>DashboardLayout: Access Protected Content
    DashboardLayout->>SessionStorage: Validate Session
    alt Valid Session
        DashboardLayout->>User: Show Content
    else Invalid Session
        DashboardLayout->>AuthLayout: Redirect to Login
    end
```

## Session Management Architecture

```mermaid
graph TD
    A[User Activity] --> B(Reset Inactivity Timer)
    B --> C{Session Valid?}
    C -->|Yes| D[Maintain Session]
    C -->|No| E[Clear Session]
    E --> F[Redirect to Login]
    
    G[Tab/Window Close] --> H[SessionStorage Clear]
    I[New Tab Opened] --> J[Sync via Storage Events]
    
    subgraph Security Layer
        K[AES-256 Encryption]
        L[SessionStorage Isolation]
        M[HMAC Validation]
    end
```

## Encryption Workflow

```mermaid
flowchart LR
    subgraph Initialization
        A[User Login] --> B[Generate 256-bit Session Key]
        B --> C[Encrypt User Data]
        C --> D[Store in sessionStorage]
    end
    
    subgraph Session Usage
        E[API Request] --> F[Decrypt Session]
        F --> G[Validate Expiration]
        G --> H[Refresh Activity Timestamp]
    end
    
    subgraph Termination
        I[Logout/Timeout] --> J[Wipe sessionStorage]
        K[Tab Close] --> J
        L[Inactivity] --> J
    end
```

## Key Security Features

1. **Session Storage**
   - Tab-specific isolation
   - Automatic clearance on tab close
   - Encrypted payload storage

2. **Cryptographic Protections**
   - AES-256-CBC encryption
   - PBKDF2 key derivation (1000 iterations)
   - Unique IV per session

3. **Activity Monitoring**
   - 15-minute inactivity timeout
   - Mouse/keyboard/scroll detection
   - Periodic session validation

4. **Cross-Tab Security**
   - Storage event synchronization
   - Session replication prevention
   - Focus state validation
