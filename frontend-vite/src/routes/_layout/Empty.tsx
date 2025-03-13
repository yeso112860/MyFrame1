import {createFileRoute} from "@tanstack/react-router";

const EmptyPage = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Boş Sayfa</h5>
                    <p>Burayı referans alıp sayfalarınızı hazırlayınız.</p>
                </div>
            </div>
        </div>
    );
};
export const Route = createFileRoute("/_layout/Empty")({
    component: EmptyPage,
});
