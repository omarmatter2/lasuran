
import {COMPONENTS} from "~/data/constants";
import Wizard from "~/components/auth/Wizard.vue";
import IntroStep from "~/components/auth/IntroStep.vue";
import CompleteProfileStep from "~/components/auth/CompleteProfile.vue";
import SendOtpStep from "~/components/auth/SendOtpStep.vue";
import VerifyOtpStep from "~/components/auth/VerifyOtpStep.vue";
import ServiceShow from "~/components/service/Show.vue";
import ServiceGuest from "~/components/service/Guest.vue";
import ServiceAppointment from "~/components/service/Appointment.vue";
import ServiceSuccess from "~/components/service/Success.vue";

const components: {} = {
    [COMPONENTS.AUTH_WIZARD] : Wizard,
    [COMPONENTS.INTRO_STEP] : IntroStep,
    [COMPONENTS.SEND_OTP_STEP] : SendOtpStep,
    [COMPONENTS.VERIFY_OTP_STEP] : VerifyOtpStep,
    [COMPONENTS.COMPLETE_PROFILE_STEP] : CompleteProfileStep,
    [COMPONENTS.SERVICE_SHOW] : ServiceShow,
    [COMPONENTS.SERVICE_GUEST] : ServiceGuest,
    [COMPONENTS.SERVICE_APPOINTMENT] : ServiceAppointment,
    [COMPONENTS.SERVICE_SUCCESS] : ServiceSuccess,
};
export default components;