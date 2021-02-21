export interface IDecks {
  id: number
  name: string
  tag: string
  //This is a string with multiple decks separated by ';'
  decks: string
  created_at: Date
  updated_at: Date
}
