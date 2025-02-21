import { uuid } from 'uuidv4';

export class Card {
    public readonly id: string
    public title: string
    public description: string

    constructor(title: string, description: string) {
        this.id = uuid()
        this.title = title
        this.description = description
    }
}

export class Cards {
    private _cards: Card[]

    constructor() {
        this._cards = []
    }

    get list() {
        return this._cards
    }

    getCard(id: string) {
        return this._cards.find(card => card.id === id)
    }

    addCard(title: string, desc: string) {
        const card = new Card(title, desc)
        this._cards.push(card)
        return card
    }

    updateCard(editedCard: Card) {
        const is = this._cards.find(card => card.id === editedCard.id)
        if (!is) return null
        this._cards = this._cards.map(card => card.id === editedCard.id ? editedCard : card)
        return editedCard
    }

    removeCard(id: string) {
        const is = this._cards.find(card => card.id === id)
        if (!is) return null
        this._cards = this._cards.filter(card => card.id !== id)
        return is.id
    }
}