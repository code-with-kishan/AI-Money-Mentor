export type OtpRecord = {
  otp: string;
  expires: number;
  count: number;
};

const globalForOtp = globalThis as unknown as {
  __otpStore: Record<string, OtpRecord> | undefined;
};

// Always persist on globalThis so send-otp and verify-otp share the same store
// across different API route invocations within the same process.
if (!globalForOtp.__otpStore) {
  globalForOtp.__otpStore = {};
}

export const otpStore: Record<string, OtpRecord> = globalForOtp.__otpStore;

