import Sidebar from "../../components/sidebar";

const BusinessPage = () => {
    const links = [
        { href: "/business/topic1", label: "Topic 1" },
        { href: "/business/topic2", label: "Topic 2" },
        { href: "/business/topic3", label: "Topic 3" },
    ];

    return (
        <div className="flex">
            <Sidebar title="Business Topics" links={links} />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Business Chat Page</h1>
                <div className="border rounded-lg p-4 bg-white">
                    <p>Chat or camera content for Business will go here.</p>
                </div>
            </div>
        </div>
    );
};

export default BusinessPage;
