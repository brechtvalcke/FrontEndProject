export class NetworkCalls {
    public baseURL: 'https://howestmeetme.herokuapp.com';
    public getGroups() {
        return this.baseURL + '/api/group';
    }
    public getGroup(id: String) {
        return this.baseURL + '/api/group/' + id;
    }
}
