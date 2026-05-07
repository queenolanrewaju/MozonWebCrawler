export const getPage = async (link: string): Promise<string> => {
    try {
        const res = await fetch(link);

        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }

        return await res.text(); //returns html text of the page that is returned
    } catch (error: any) {
        throw new Error(error?.message || "An error occurred while fetching the page");
    }
};