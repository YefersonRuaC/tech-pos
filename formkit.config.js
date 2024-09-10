import { generateClasses } from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            //global applies this classes to all fields
            global: {
                label: 'block mb-1 font-bold text-lg',
                message: 'text-red-600 mb-0 font-bold',
                wrapper: 'space-y-1 mb-1',
                outer: 'mb-2',
                input: 'w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400'
            },
            file: {
                noFiles: 'block mt-1',
                fileItem: 'hidden'
            },
            submit: {
                input: '$reset w-full bg-green-400 hover:bg-green-500 p-2 rounded font-bold uppercase text-green-950 mt-2 disabled:opacity-50'
            }
        })
    }
}

export default config