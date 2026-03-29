export const memberships = {
  free: {
    name: 'Free',
    permissions: {
      view_all_signals: false,
      view_signal_details: false,
    },
  },
  premium: {
    name: 'Premium',
    permissions: {
      view_all_signals: true,
      view_signal_details: true,
    },
  },
};
