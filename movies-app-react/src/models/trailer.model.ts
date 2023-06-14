export class Trailer {
    id: string;
    key: string;
    name: string;
    site: string;
    thumbnail: string;
    video: string;

    constructor(data?: any) {
        this.id = data && data.id || '';
        this.key = data && data.key || '';
        this.name = data && data.name || '';
        this.site = data && data.site || '';
        this.thumbnail = this.key && `https://img.youtube.com/vi/${this.key}/sddefault.jpg` || '';
        this.video = this.key && `https://www.youtube.com/embed/${this.key}?autoplay=1` || '';
    }
}