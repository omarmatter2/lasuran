import { defineStore } from "pinia";
import type { AuthState } from '~/types/auth';
import { COMPONENTS } from "~/data/constants";
import components from "~/components/import";

export const useAuth = defineStore("auth", {
    state: (): AuthState => {
        return {
            user: {},
            token: '',
            step: COMPONENTS.SEND_OTP_STEP,
            mobile_number: '',
            mobile_code: "966"
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
        }
    },
    actions: {
        sendOtp(payload: any) {
            payload.mobile_number = `${payload.mobile_code}${payload.mobile_number}`;
            this.$state.mobile_number = payload.mobile_number;
            this.$state.mobile_code = payload.mobile_code;
            const response = useApi("account/send-otp", {
                method: "POST",
                body: payload,
            }).then((response) => {
                this.setStepComponent(COMPONENTS.VERIFY_OTP_STEP);
            });
            return response;
        },
        verifyOtp(payload: {}) {
            payload.otp = (payload.otp ?? []).join('');
            const response = useApi("account/verify-otp", {
                method: "POST",
                body: payload,
            },{
                onSuccess: (data : any) => {
                    this.setStepComponent(COMPONENTS.COMPLETE_PROFILE_STEP);
                    this.setAuth({
                        user : data.data,
                        token: data.data.token,
                    })
                    console.log("verifyOtp",data)
                }
            });

            return response;
        },
        register(payload: {}) {
            //  this.setAuth({
            //             user :  { "id": 1, "name": "sameh" },
            //             token : "this is token from api"
            //         })

        },
        logout() {
            alert('verifyOtp')
            setTimeout(() => {
                this.forgetAuth()
            }, 2000)
        },
        setAuth(payload: { user: {}, token: string }) {
            this.$state.user = payload.user;
            this.$state.token = payload.token;
        },
        forgetAuth() {
            this.$state.token = '';
            this.$state.user = {};
        },
        setStepComponent(state: AuthState) {
            this.$state.step = state;
        }
    },
    persist: true,
})