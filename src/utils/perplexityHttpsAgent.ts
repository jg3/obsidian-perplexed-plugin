import * as https from 'node:https';
import * as tls from 'node:tls';

let systemTrustAgent: https.Agent | null | undefined;

/**
 * Adds OS-trusted CAs to Node's bundled roots for Perplexity streaming calls.
 *
 * Packaged Electron applications may ignore NODE_EXTRA_CA_CERTS when the
 * nodeOptions fuse is disabled. Supplying the combined trust set explicitly
 * allows managed TLS-inspection roots from the OS trust store without
 * disabling certificate or hostname verification.
 */
export function getPerplexityHttpsAgent(): https.Agent | undefined {
    if (systemTrustAgent === undefined) {
        try {
            const certificates = new Set([
                ...tls.getCACertificates('default'),
                ...tls.getCACertificates('system'),
            ]);
            systemTrustAgent = new https.Agent({ ca: [...certificates] });
        } catch (error) {
            console.warn(
                'Could not load the system CA store; using Node.js default certificate trust.',
                error,
            );
            systemTrustAgent = null;
        }
    }

    return systemTrustAgent ?? undefined;
}
