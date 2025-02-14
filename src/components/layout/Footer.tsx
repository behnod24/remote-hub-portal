
const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-bold text-lg mb-4">JobHub</h3>
            <p className="text-text-secondary">
              Find your dream job or hire the perfect candidate with JobHub's modern job board platform.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-text">Browse Jobs</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text">Company Reviews</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text">Salary Guide</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text">Career Advice</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-text">Post a Job</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text">Browse Candidates</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text">Pricing</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text">Recruitment Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-text">Support</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text">Sales</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text">Press</a></li>
              <li><a href="#" className="text-text-secondary hover:text-text">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-text-secondary">
          <p>&copy; {new Date().getFullYear()} JobHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
