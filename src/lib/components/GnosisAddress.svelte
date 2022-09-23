<script lang="ts">
	import axios from 'axios';

	export let address: string;

	$: address && checkAddressInfo(address);

	interface ApiResponse {
		address: string;
		fallbackHandler: string;
		guard: string;
		masterCopy: string;
		modules: [];
		nonce: number;
		owners: string[];
		length: number;
		threshold: number;
		version: string;
	}

	let isGnosis = false;
	let gnosisAddress: string;
	let owners: string[];
	let threshold: number;
	let mastercopy: string;
	let pendingTransactions: any[] = [];

	const CACHE_KEY = 'gnosis_check';

	function setGet(data?: any): Record<string, ApiResponse> {
		let version = '1';
		if (data) {
			localStorage.setItem(CACHE_KEY, JSON.stringify({ ...data, _version: version }));
		}
		const result = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
		if (result._version === version) {
			return result;
		} else {
			localStorage.removeItem(CACHE_KEY);
			return {};
		}
	}

	async function checkAddressInfo(address: string) {
		const cachedResult = setGet()[address?.toLowerCase()];
		const { data, status }: { data: any; status: number } =
			typeof cachedResult === 'object'
				? { data: cachedResult, status: 200 }
				: await (async () => {
						const { data, status } = await axios.get(
							`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/app/gnosis/check/${address}`,
							{
								headers: {
									apikey: import.meta.env.VITE_API_KEY
								}
							}
						);

						const { data: data2, status: status2 } = await axios.get(
							`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/app/gnosis/txns/${address}/pending`,
							{
								headers: {
									apikey: import.meta.env.VITE_API_KEY
								}
							}
						);
						return {
							data: { ...data, pendingTransactions: data2.pendingTransactions },
							status
						};
				  })();
		if (status < 400) {
			isGnosis = true;
			gnosisAddress = address;
			mastercopy = data.masterCopy;
			owners = data.owners;
			threshold = data.threshold;
			pendingTransactions = data?.pendingTransactions || [];
			if (typeof cachedResult !== 'object') {
				setGet({ ...setGet(), [address?.toLowerCase()]: data });
			}
		} else {
			setGet({ ...setGet(), [address?.toLowerCase()]: {} });
		}
	}
</script>

<slot {gnosisAddress} {owners} {threshold} {mastercopy} {pendingTransactions} {isGnosis} />
{#if isGnosis}
	<slot name="gnosis" {gnosisAddress} {owners} {threshold} {mastercopy} {pendingTransactions} />
{:else}
	<slot name="not-gnosis" />
{/if}
