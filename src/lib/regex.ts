export const r = (string: string, regexp: string) => {
    const pattern = new RegExp(regexp);
    return pattern.test(string);
}

export class Regex {
    public string!: string;

    public constructor(
        string: string
      ) {
          this.string = string;
      }

    public try = {
        name: (): boolean => {
            const regexp = new RegExp(patterns.name);
            return regexp.test(this.string);
        },
        email: (): boolean => {
            const regexp = new RegExp(patterns.email);
            return regexp.test(this.string);
        },
        phone: (): boolean => {
            const regexp = new RegExp(patterns.phone);
            return regexp.test(this.string);
        },
        ID: (): boolean => {
            const regexp = new RegExp(patterns.ID);
            return regexp.test(this.string);
        },
        date: (): boolean => {
            const regexp = new RegExp(patterns.date);
            return regexp.test(this.string);
        },
        website: (): boolean => {
            const regexp = new RegExp(patterns.website);
            return regexp.test(this.string)
        }
    }
}

const patterns = {
    name: /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})*$/g,
    email: /^([a-z0-9_.+-]+)@([da-z.-]+).([a-z.]{2,6})$/,
    phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
    // eslint-disable-next-line no-useless-escape
    ID: /^[^ !"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+$/,
    date: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    website: /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
}
