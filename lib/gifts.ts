export interface Gift {
  id: string
  name: string
  description: string
  price?: number // Make price optional
  store: string
  link: string
  category: "kitchen" | "home" | "experiences" | "gift-cards"
  image?: string
  purchased: boolean
}

export const gifts: Gift[] = [
  {
    id: "1",
    name: "KitchenAid Kjøkkenmaskin",
    description:
      "Profesjonell 5-liters kjøkkenmaskin i lavendel. Perfekt for bakeentusiaster med 10 hastigheter og flere tilbehør.",
    store: "Elkjøp",
    link: "https://www.elkjop.no",
    category: "kitchen",
    image: "/placeholder.svg?height=200&width=400",
    purchased: false,
  },
  {
    id: "2",
    name: "Dyson Luftrenser",
    description: "HEPA-luftrenser og vifte som fjerner allergener og forurensning mens den kjøler hjemmet ditt.",
    store: "Power",
    link: "https://www.power.no",
    category: "home",
    image: "/placeholder.svg?height=200&width=400",
    purchased: true,
  },
  {
    id: "3",
    name: "Le Creuset Gryte",
    description: "5,5-liters emaljert støpejerngryte i ametyst lilla. Perfekt for langtidssteking, steking og baking.",
    store: "Kitchn",
    link: "https://www.kitchn.no",
    category: "kitchen",
    image: "/placeholder.svg?height=200&width=400",
    purchased: false,
  },
  {
    id: "4",
    name: "Brooklinen Luksuslakensett",
    description: "King size 480-tråders satengvevd lakensett i lavendel. Inkluderer laken, dynetrekk og 2 putevar.",
    store: "Sengemakeriet",
    link: "https://www.sengemakeriet.no",
    category: "home",
    image: "/placeholder.svg?height=200&width=400",
    purchased: false,
  },
  {
    id: "5",
    name: "Vintur",
    description: "Heldags guidet tur i Hardanger med transport, smaksprøver på tre premium vingårder og gourmetlunsj.",
    store: "Opplevelser.no",
    link: "https://www.opplevelser.no",
    category: "experiences",
    image: "/placeholder.svg?height=200&width=400",
    purchased: false,
  },
  {
    id: "6",
    name: "Gavekort på Amazon",
    description:
      "Digitalt gavekort med fleksible beløpsalternativer. Perfekt for å la paret velge akkurat det de trenger.",
    store: "Amazon",
    link: "https://www.amazon.com",
    category: "gift-cards",
    image: "/placeholder.svg?height=200&width=400",
    purchased: false,
  },
  {
    id: "7",
    name: "Matlagingskurs for to",
    description:
      "Interaktivt matlagingskurs med en profesjonell kokk. Lær å tilberede et gourmet treretters måltid sammen.",
    store: "Kulinarisk Akademi",
    link: "https://www.kulinariskakademi.no",
    category: "experiences",
    image: "/placeholder.svg?height=200&width=400",
    purchased: false,
  },
  {
    id: "8",
    name: "Philips Hue Startpakke",
    description: "Smart belysningssystem med bro og 4 fargeskiftende pærer. Kontroller med app eller stemmekommandoer.",
    store: "Elkjøp",
    link: "https://www.elkjop.no",
    category: "home",
    image: "/placeholder.svg?height=200&width=400",
    purchased: false,
  },
  {
    id: "9",
    name: "Spa-dag Gavekort",
    description:
      "Hel dag med forkjælelse inkludert parmassasje, ansiktsbehandlinger og tilgang til alle spa-fasiliteter.",
    store: "Farris Bad",
    link: "https://www.farrisbad.no",
    category: "gift-cards",
    image: "/placeholder.svg?height=200&width=400",
    purchased: false,
  },
]

