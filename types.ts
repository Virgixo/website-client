declare namespace NodeJS {
	export interface ProcessEnv {
		CLOUDFLARE_TURNSTILE_SECRET_KEY: string;

		EMAIL_USER_NAME: string;
		EMAIL_USER_PASS: string;
	}
}
