import Sidebar from "../../components/sidebar";

const ArchitecturePage = () => {
    const links = [
        { href: "/architecture/topic1", label: "Topic 1" },
        { href: "/architecture/topic2", label: "Topic 2" },
        { href: "/architecture/topic3", label: "Topic 3" },
    ];

    return (
        <div className="flex">
            <Sidebar title="Architecture Topics" links={links} />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Architecture Chat Page</h1>
                <div className="border rounded-lg p-4 bg-white">
                    <p>Chat or camera content for Architecture will go here.</p>
                </div>
            </div>
        </div>
    );
};

export default ArchitecturePage;
