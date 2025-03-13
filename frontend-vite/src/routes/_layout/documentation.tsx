import { createFileRoute } from "@tanstack/react-router";

export const Documentation = () => {
    return (
        <>
            Bu şablon primeract kütüphanesi kullanılarak hazırlanmıştır.
        </>);
}
export const Route = createFileRoute("/_layout/documentation")({
    component: Documentation,
});