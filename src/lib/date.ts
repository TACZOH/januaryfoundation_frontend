import moment from 'moment';

export const date: string = moment.utc().toISOString().slice(0, 10);

export const published = (date: string): string => {
    return moment(date).format("MMMM Do, YYYY")
}
