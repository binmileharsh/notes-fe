import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-xl  border border-gray-200 rounded-2xl">
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-3xl font-bold text-gray-800">
            👋 Welcome, User!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6 px-8 pb-10">
          <p className="text-gray-600 text-lg">
            Get started by signing in or creating a new account.
          </p>

          <div className="space-y-4">
            <Link to="/signin">
              <Button className="w-full text-lg py-6 rounded-xl">Sign In</Button>
            </Link>

            <Link to="/registered">
              <Button className="w-full text-lg py-6 rounded-xl" variant="outline">
                Register
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
