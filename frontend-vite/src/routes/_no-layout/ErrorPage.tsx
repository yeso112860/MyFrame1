import {createFileRoute, ErrorComponentProps, useNavigate} from '@tanstack/react-router'
import { Button } from 'primereact/button';

const ErrorPage = (props : ErrorComponentProps) => {
    console.log('ErrorPage', props);
    const navigate = useNavigate();

    return (
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <img src="/layout/images/logo-white.png" alt="Projem logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
                        <div className="flex justify-content-center align-items-center bg-pink-500 border-circle" style={{ height: '3.2rem', width: '3.2rem' }}>
                            <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                        </div>
                        <h1 className="text-900 font-bold text-5xl mb-2">Error Occured</h1>
                        <div className="text-600 mb-5">Something went wrong.</div>
                        <img src="/layout/images/asset-error.svg" alt="Error" className="mb-5" width="80%" />
                        <Button icon="pi pi-arrow-left" label="Go to Dashboard" text onClick={() => navigate({to: `/logout`})} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;

export const Route = createFileRoute('/_no-layout/ErrorPage')({
    component: ErrorPage,
})
