import Loader from "./ui/loader";

type ContentLayoutProps = {
    loading?: boolean;
    children?: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ loading, children }) => {
    return (
        <div className="content-layout">
            {loading ? (
                <Loader />
            ) : (
                children
            )}
        </div>
    )
}

export default ContentLayout