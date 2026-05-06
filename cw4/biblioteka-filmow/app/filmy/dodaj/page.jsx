"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const d = new Date();

const validationSchema = Yup.object({
	title: Yup.string()
		.required("Tytuł jest wymagany.")
		.min(2, "Tytuł musi mieć minimum 2 znaki"),
	year: Yup.number()
		.required("Rok jest wymagany.")
		.min(1888, "Rok nie może być wcześniejszy niż 1888.")
		.max(d.getFullYear(), `Rok nie może być późniejszy niż ${d.getFullYear()}`),
	genre: Yup.string()
		.required("Gatunek jest wymagany.")
		.min(1, "Gatunek jest wymagany."),
});

export default function AddFilmForm() {
	const router = useRouter();

	async function submitForm(values) {
		const response = await fetch("/api/filmy", {
			method: "POST",
			body: JSON.stringify(values),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			router.push("/filmy");
			alert("Film dodany pomyślnie!");
		}
	}

	const formik = useFormik({
		initialValues: { title: "", year: "", genre: "" },
		validationSchema,
		onSubmit: values => {
			submitForm(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div>
				<input
					id='title'
					type='text'
					{...formik.getFieldProps("title")}
					placeholder='Tytuł'
					aria-invalid={!!(formik.touched.title && formik.errors.title)}
					aria-describedby='title-error'
				/>
				{/* Błąd wyświetlany tylko po dotknięciu pola */}
				{formik.touched.title && formik.errors.title && (
					<span id='title-error' role='alert'>
						{formik.errors.title}
					</span>
				)}
			</div>

			<div>
				<input
					id='year'
					type='number'
					{...formik.getFieldProps("year")}
					placeholder='Rok'
					aria-invalid={!!(formik.touched.year && formik.errors.year)}
					aria-describedby='year-error'
				/>
				{formik.touched.year && formik.errors.year && (
					<span id='year-error' role='alert'>
						{formik.errors.year}
					</span>
				)}
			</div>

			<div>
				<input
					id='genre'
					type='text'
					{...formik.getFieldProps("genre")}
					placeholder='Gatunek'
					aria-invalid={!!(formik.touched.genre && formik.errors.genre)}
					aria-describedby='genre-error'
				/>
				{formik.touched.genre && formik.errors.genre && (
					<span id='genre-error' role='alert'>
						{formik.errors.genre}
					</span>
				)}
			</div>

			<button type='submit' disabled={formik.isSubmitting}>
				Dodaj
			</button>
		</form>
	);
}
