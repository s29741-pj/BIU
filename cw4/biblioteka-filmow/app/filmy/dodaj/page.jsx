"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useFilmDispatch } from "@/context/FilmContext";

const d = new Date();

const validationSchema = Yup.object({
    title: Yup.string()
        .required("Tytuł jest wymagany.")
        .min(2, "Tytuł musi mieć minimum 2 znaki"),
    year: Yup.number()
        .required("Rok jest wymagany.")
        .min(1888, "Rok nie może być wcześniejszy niż 1888.")
        .max(2030, `Rok nie może być późniejszy niż 2030`),
    genre: Yup.string()
        .required("Gatunek jest wymagany.")
        .min(1, "Gatunek jest wymagany."),
});

export default function AddFilmForm() {
    const router = useRouter();
    const dispatch = useFilmDispatch();

    async function submitForm(values) {
        const response = await fetch("/api/filmy", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const newFilm = await response.json();
            dispatch({ type: 'ADD_FILM', payload: newFilm });
            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: { message: 'Film dodany pomyślnie!', type: 'success' }
            });
            router.push("/filmy");
        } else {
            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: { message: 'Błąd podczas dodawania filmu.', type: 'error' }
            });
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
        <main className='container'>
            <Link href='/filmy'>
                <button className='back-button'>← Powrót do Filmów</button>
            </Link>

            <div className='section'>
                <h1>➕ Dodaj Nowy Film</h1>
                <p>Uzupełnij formularz, aby dodać film do biblioteki.</p>
            </div>

            <div className='section'>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor='title'>Tytuł Filmu *</label>
                        <input
                            id='title'
                            type='text'
                            {...formik.getFieldProps("title")}
                            placeholder='np. Incepcja'
                            aria-invalid={!!(formik.touched.title && formik.errors.title)}
                            aria-describedby='title-error'
                        />
                        {formik.touched.title && formik.errors.title && (
                            <span id='title-error' role='alert'>
                                {formik.errors.title}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor='year'>Rok Wydania *</label>
                        <input
                            id='year'
                            type='number'
                            {...formik.getFieldProps("year")}
                            placeholder='np. 2010'
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
                        <label htmlFor='genre'>Gatunek *</label>
                        <input
                            id='genre'
                            type='text'
                            {...formik.getFieldProps("genre")}
                            placeholder='np. Science Fiction'
                            aria-invalid={!!(formik.touched.genre && formik.errors.genre)}
                            aria-describedby='genre-error'
                        />
                        {formik.touched.genre && formik.errors.genre && (
                            <span id='genre-error' role='alert'>
                                {formik.errors.genre}
                            </span>
                        )}
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
                        <button type='submit' disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Dodawanie..." : "Dodaj Film"}
                        </button>
                        <Link href='/filmy'>
                            <button type='button' className='back-button'>
                                Anuluj
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}