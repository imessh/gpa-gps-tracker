export default function RemovedPage(){
  return (
    <div className="container py-24">
      <div className="card">
        <h1 className="h2">Feature removed</h1>
        <p className="small mt-3">The GPS Interest Tracker page has been removed as requested. If you need to restore it later, the data is still in Firestore but the UI has been removed.</p>
        <div className="mt-4">
          <a href="/" className="btn btn-outline">Back to Home</a>
          <a href="/calculator" className="btn btn-primary" style={{marginLeft:'0.5rem'}}>Open Calculator</a>
        </div>
      </div>
    </div>
  );
}
