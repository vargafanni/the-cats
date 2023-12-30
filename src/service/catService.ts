import axios from "axios";
import { IBreed, ICat } from "../interfaces/catServiceInterfaces";

export const getCatImages = (page: number, setCats: (response: ICat[]) => void, noMore: (noMore: boolean) => void, breed?: string) => {

    axios.get<ICat[]>(`https://api.thecatapi.com/v1/images/search?order=ASC&limit=12&${breed ? `breed_ids=${breed}` : ''}&page=${page}`,
        {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "live_DCkMdI7rxCF2PWS0cjvxsuYwV2ezHjB9wCemUiP0KdPrTZc7v1qN16ggkghw40SU"
            }
        }
    ).then(response => {
        setCats(response.data);
        if (response.data.length < 12) {
            noMore(true);
        }
    }).catch((error) => {
        console.error(error)
        setCats([]);
    })
}

export const getBreeds = (setBreeds: (response: IBreed[]) => void) => {
    axios.get<IBreed[]>(`https://api.thecatapi.com/v1/breeds`,
        {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "live_DCkMdI7rxCF2PWS0cjvxsuYwV2ezHjB9wCemUiP0KdPrTZc7v1qN16ggkghw40SU"
            }
        }).then(response => {
            setBreeds(response.data);
            return response.data.length;
        }).catch((error) => {
            console.log(error);
            setBreeds([]);
        })
}