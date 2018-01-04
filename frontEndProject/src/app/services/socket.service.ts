import {Injectable} from '@angular/core';
import {CustomHttpModule} from '../../coreClasses/CustomHttpModule';


@Injectable()
export class FbService {
    private headers = new Headers({ 'Content-Type' : 'application/json' });
    constructor(
        private http: CustomHttpModule ) {
        }
}
