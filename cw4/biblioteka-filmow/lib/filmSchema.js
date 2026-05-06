const { z } = require("zod");

const d = new Date();

const filmSchema = z.object({
	title: z
		.string({ required_error: "Tytuł jest wymagany." })
		.min(2, "Tytuł musi mieć minimum 2 znaki"),
	year: z
		.number({ required_error: "Rok jest wymagany" })
		.int()
		.min(1888, "Rok nie może być wcześniejszy niż 1888.")
		.max(d.getFullYear(), "Rok nie może być późniejszy niż " + d.getFullYear()),
	genre: z
		.string({ required_error: "Gatunek jest wymagany." })
		.min(1, "Gatunek jest wymagany."),
});

export { filmSchema };
