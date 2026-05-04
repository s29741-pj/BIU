const { z } = require("zod");

const filmSchema = z.object({
	title: z
		.string({ required_error: "Tytuł jest wymagany" })
		.min(2, "Tytuł musi mieć minimum 2 znaki"),
	year: z
		.number({ required_error: "Rok jest wymagany" })
		.int()
		.min(1888, "Rok nie może być wcześniejszy niż 1888")
		.max(2030, "Rok nie może być późniejszy niż 2030"),
	genre: z
		.string({ required_error: "Gatunek jest wymagany" })
		.min(1, "Gatunek jest wymagany"),
});

export { filmSchema };
