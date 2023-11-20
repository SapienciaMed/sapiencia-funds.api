import ControlSelectRepository from "App/Repositories/ControlSelectRepository";

export interface IControlSelectService {

}
export default class ControlSelectServices implements IControlSelectService {
    constructor(private controlSelectRepository: ControlSelectRepository) { }
}