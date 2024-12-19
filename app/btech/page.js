import Sidebar from "../../components/sidebar";

const BTechPage = () => {
    const links = [
        { href: "/btech/topic1", label: "Topic 1" },
        { href: "/btech/topic2", label: "Topic 2" },
        { href: "/btech/topic3", label: "Topic 3" },
    ];

    return (
        <div className="flex">
            <Sidebar title="BTech Topics" links={links} />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">BTech Chat Page</h1>
                <div className="border rounded-lg p-4 bg-white">
                    <p>Chat or camera content for BTech will go here.</p>
                </div>
            </div>
        </div>
    );
};

export default BTechPage;
