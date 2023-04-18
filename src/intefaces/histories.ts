export default interface Histories {
	id: number,
	askOrBid: string,
	settledRate: number,
	lots: number,
	algorithmName: string,
	profits: number,
	settledDate: Date,
	pair: String
}