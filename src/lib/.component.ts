// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const parent = document.getElementById('container')!;

export const Component = {
    create: () => {
        const element = document.createElement('div');
        element.className = 'grid justify-items-center'
        element.id = 'donate';
        parent.appendChild(element);
    },
    destroy: () => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const element = document.getElementById('donate')!;
		parent.removeChild(element);
        return false;
    }
}
