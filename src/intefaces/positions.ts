export default interface Positions {
	id: number,
	askOrBid: string,
	atRate: number,
	lots: number,
	algorithmName: string,
	profits: number,
	atDate: String,
	pair: String,
	isSettled: boolean
}