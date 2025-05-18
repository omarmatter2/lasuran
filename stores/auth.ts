import { defineStore } from "pinia";
import type { AuthState } from '~/types/auth';
import { COMPONENTS } from "~/data/constants";
import components from "~/components/import";

export const useAuth = defineStore("auth", {
    state: (): AuthState => {
        return {
            loading: false,
            user: {},
            token: '',
            step: COMPONENTS.SEND_OTP_STEP,
            mobile_number: '',
            mobile_code: "966",
            otp: null
        }
    },
    getters: {
        isAuthenticated(state: AuthState) {
            return !!state.token;
        },
        getUser(state: AuthState) {
            return state.user;
        },
        getToken(state: AuthState) {
            return state.token;
        },
        getStepComponent(state: AuthState) {
            return components[state.step];
        },
        getUserName(state: AuthState) {
            return `${this.getUser?.first_name} ${this.getUser?.last_name}` ?? '-'
        },
        getMobileNumber(state: AuthState) {
            return`+${this.getUser?.mobile_number}` ?? '-'
        },
        getFullOtpMobileNumber(state: AuthState) {
            return `+${state.mobile_code} ${state.mobile_number}`;
        }
    },
    actions: {
        sendOtp(payload: any) {
            // payload.mobile_number = `${payload.mobile_code}${payload.mobile_number}`;
            this.$state.mobile_number = payload.mobile_number;
            this.$state.mobile_code = payload.mobile_code;
            this.$state.loading = true;
            return useApi("account/send-otp", {
                method: "POST",
                body: {
                    mobile_number: `${payload.mobile_code}${payload.mobile_number}`,
                    mobile_code: payload.mobile_code
                }},
                {
                    onSuccess:(data) => {
                        if (data.status) {
                            this.setStepComponent(COMPONENTS.VERIFY_OTP_STEP);
                        }
                        this.$state.loading = false;
                    },
                    onError: (err) => {
                        this.$state.loading = false;
                    }
                });
        },
        verifyOtp(payload: {otp : null}) {
            const { setDialogShow } = useApp();
            this.$state.loading = true;
            this.$state.otp = (payload.otp ?? []).join('');
            return useApi("account/verify-otp", {
                method: "POST",
                body: {
                    mobile_number: `${this.$state.mobile_code}${this.$state.mobile_number}`,
                    mobile_code: this.$state.mobile_code,
                    otp : this.$state.otp,
                },
            },{
                onSuccess: (data : any) => {
                    this.$state.loading = false;
                    let response = data.data;
                    console.log('verifyOtp',response);
                    if (response.is_completed) {
                        // this.setStepComponent(COMPONENTS.SEND_OTP_STEP);
                        this.setAuth({
                            user : response,
                            token: response.token,
                        });
                        setDialogShow(false);
                    } else {
                        this.setStepComponent(COMPONENTS.COMPLETE_PROFILE_STEP);
                    }
                },
                onError: (err) => {
                    this.$state.loading = false;
                }
            });
        },
        register(payload: {}) {
            const { setDialogShow } = useApp();
            this.$state.loading = true;
            payload.otp = this.$state.otp;
            payload.mobile_number = `${this.$state.mobile_code}${this.$state.mobile_number}`;
            payload.mobile_code = this.$state.mobile_code;
            this.$state.otp = payload.otp;
            return useApi("user/register", {
                method: "POST",
                body: payload
            },{
                onSuccess: (data : any) => {
                    this.$state.loading = false;
                    let response = data.data;
                    this.setAuth({
                        user : response,
                        token: response.token,
                    });
                    setDialogShow(false);
                },
                onError: (err) => {
                    this.$state.loading = false;
                }
            });
        },
        logout() {
            this.forgetAuth()
        },
        setAuth(payload: { user: {}, token: string }) {
            this.$state.user = payload.user;
            this.$state.token = payload.token;
        },
        forgetAuth() {
            this.$state.token = '';
            this.$state.user = {};
        },
        setStepComponent(step: any) {
            this.$state.step = step;
        }
    },
    persist: {
        storage: localStorage,
    },
})