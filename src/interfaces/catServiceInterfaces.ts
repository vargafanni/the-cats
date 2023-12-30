export interface ICat {
    id: string,
    url: string,
    breeds: IBreed[],
  }

export interface IBreed {
    id: string,
    name: string,
    temperament: string,
    origin: string,
    description: string
}