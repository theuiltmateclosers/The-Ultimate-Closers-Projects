# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability, please send an email to **security@theultimateclosers.com**.

Please include:

1. Description of the vulnerability
2. Steps to reproduce the issue
3. Potential impact
4. Any suggested fixes (if applicable)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Varies based on severity (critical issues are prioritized)

## Security Measures

This project implements multiple layers of security:

### Frontend (Next.js)

- Content Security Policy (CSP) with nonce and strict-dynamic
- HSTS with preload
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME sniffing prevention)
- Referrer Policy
- Permissions Policy

### Backend (NestJS)

- Helmet.js for HTTP header security
- Rate limiting (300 req/15min by default)
- CORS with domain whitelist
- Input validation (TODO: implement)
- JWT authentication (TODO: implement)
- SQL injection prevention (TODO: implement with ORM)

### CI/CD

- **CodeQL**: Weekly SAST scans
- **Semgrep**: Per-PR security rule checks
- **OSV Scanner**: Daily dependency vulnerability scans
- Automated security alerts via GitHub Security tab

## Best Practices

When contributing to this project:

1. ✅ Never commit secrets or API keys
2. ✅ Use environment variables for sensitive data
3. ✅ Keep dependencies up to date
4. ✅ Follow the principle of least privilege
5. ✅ Validate and sanitize all user inputs
6. ✅ Use prepared statements for database queries
7. ✅ Enable 2FA on your GitHub account

## Security Checklist for Deployment

Before deploying to production:

- [ ] All `.env` files are properly configured and never committed
- [ ] JWT secrets are strong and rotated regularly
- [ ] Database credentials use least-privilege accounts
- [ ] HTTPS is enforced everywhere (HSTS active)
- [ ] Rate limiting is tuned for production traffic
- [ ] Monitoring and alerting are configured
- [ ] Backups are automated and tested
- [ ] Incident response plan is documented

## Known Issues

None currently reported.

## Hall of Fame

We appreciate security researchers who responsibly disclose vulnerabilities:

<!-- List will be updated as researchers report issues -->

---

For general questions about security, contact: security@theultimateclosers.com
