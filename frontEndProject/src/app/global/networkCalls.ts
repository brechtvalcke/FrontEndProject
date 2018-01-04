export class NetworkCalls {
    public baseURL= '';
    public getGroups() {
        return this.baseURL + '/api/group';
    }
    public getGroup(id: String) {
        return this.baseURL + '/api/group/' + id;
    }
}
