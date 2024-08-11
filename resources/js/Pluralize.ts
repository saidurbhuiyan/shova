export default class Pluralize {
    private readonly irregulars: { [key: string]: string };

    constructor() {
        // Initialize irregular plural forms
        this.irregulars = {
            'child': 'children',
            'person': 'people',
            'man': 'men',
            'woman': 'women',
            'mouse': 'mice',
            'goose': 'geese',
            'foot': 'feet',
            'tooth': 'teeth',
            'cactus': 'cacti',
            'focus': 'foci',
            'fungus': 'fungi',
            'nucleus': 'nuclei',
            'syllabus': 'syllabi',
            'analysis': 'analyses',
            'diagnosis': 'diagnoses',
            'oasis': 'oases',
            'thesis': 'theses',
            'crisis': 'crises',
            'phenomenon': 'phenomena',
            'criterion': 'criteria',
            'datum': 'data',
        };
    }

    // Convert a singular word to its plural form
    public toPlural(word: string): string {
        // Convert to lowercase for consistent matching
        const lowerWord = word.toLowerCase();

        // Check for irregular nouns first
        if (this.irregulars[lowerWord]) {
            return this.irregulars[lowerWord];
        }

        // Regular pluralization rules
        if (lowerWord.endsWith('y') && !'aeiou'.includes(lowerWord[lowerWord.length - 2])) {
            return lowerWord.slice(0, -1) + 'ies';
        }

        if (lowerWord.endsWith('s') || lowerWord.endsWith('x') || lowerWord.endsWith('z') || lowerWord.endsWith('sh') || lowerWord.endsWith('ch')) {
            return lowerWord + 'es';
        }

        if (lowerWord.endsWith('f')) {
            return lowerWord.slice(0, -1) + 'ves';
        }

        if (lowerWord.endsWith('fe')) {
            return lowerWord.slice(0, -2) + 'ves';
        }

            return lowerWord + 's';

    }
}