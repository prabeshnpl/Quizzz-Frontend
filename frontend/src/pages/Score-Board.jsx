import withAuth from "../hoc/withAuth";

const Score_boardMain = ()=>{
    return <div className="bg-gray-900 w-3/4 min-h-screen flex items-center justify-center mx-auto">
    <h3 className="text-white">Welcoem to Score Board</h3>
</div>
}

const Score_board = () => {
    return <Score_boardMain/>
}
export default withAuth(Score_board);