// Server-side Pusher (used in API routes)
import Pusher from 'pusher';

let pusherServer = null;

export function getPusher() {
  if (pusherServer) return pusherServer;
  const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env;
  if (!PUSHER_APP_ID || !PUSHER_KEY || !PUSHER_SECRET || !PUSHER_CLUSTER) {
    return null; // Pusher not configured — features that need it will no-op
  }
  pusherServer = new Pusher({
    appId: PUSHER_APP_ID,
    key: PUSHER_KEY,
    secret: PUSHER_SECRET,
    cluster: PUSHER_CLUSTER,
    useTLS: true
  });
  return pusherServer;
}
