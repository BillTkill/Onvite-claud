import { Suspense } from "react";
import BookForm from "@/components/BookForm";

export const metadata = {
  title: "Reservar · Onvite",
  description: "Reservad vuestra invitación digital. Os enviamos una vista previa personalizada — solo pagáis cuando os enamore.",
};

export default function BookPage() {
  return (
    <Suspense fallback={<div className="section container">Cargando…</div>}>
      <BookForm />
    </Suspense>
  );
}
